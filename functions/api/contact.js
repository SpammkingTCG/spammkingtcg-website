const JSON_HEADERS = {
    "Content-Type": "application/json; charset=UTF-8",
    "Cache-Control": "no-store"
};

const REASONS = {
    general: {
        label: "General enquiry",
        inbox: "hello@spammkingtcg.co.uk"
    },
    support: {
        label: "Customer support",
        inbox: "support@spammkingtcg.co.uk"
    },
    order: {
        label: "Order or return query",
        inbox: "orders@spammkingtcg.co.uk"
    },
    trade: {
        label: "Trade or supplier enquiry",
        inbox: "trade@spammkingtcg.co.uk"
    }
};

function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: JSON_HEADERS
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    if (
        !env.RESEND_API_KEY ||
        !env.CONTACT_NOTIFICATION_EMAIL ||
        !validEmail(env.CONTACT_NOTIFICATION_EMAIL)
    ) {
        return jsonResponse(
            { error: "The enquiry service is temporarily unavailable." },
            503
        );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
        return jsonResponse({ error: "Invalid request." }, 415);
    }

    let body;

    try {
        body = await request.json();
    } catch {
        return jsonResponse({ error: "Invalid request." }, 400);
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const reason = String(body.reason || "").trim();
    const message = String(body.message || "").trim();
    const company = String(body.company || "").trim();

    // Honeypot: real visitors never fill this hidden field.
    // Return success so simple bots do not learn they were blocked.
    if (company) {
        return jsonResponse({ ok: true });
    }

    if (
        !name ||
        name.length > 80 ||
        !email ||
        email.length > 254 ||
        !validEmail(email) ||
        !REASONS[reason] ||
        !message ||
        message.length > 3000
    ) {
        return jsonResponse(
            { error: "Please check the form and try again." },
            400
        );
    }

    const enquiry = REASONS[reason];
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeReason = escapeHtml(enquiry.label);
    const safeInbox = escapeHtml(enquiry.inbox);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

    const subject = `Website enquiry: ${enquiry.label} — ${name}`;

    const text = [
        "New SpammKing TCG website enquiry",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Reason: ${enquiry.label}`,
        `Business inbox: ${enquiry.inbox}`,
        "",
        "Message:",
        message
    ].join("\n");

    const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
            <h2>New SpammKing TCG website enquiry</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Reason:</strong> ${safeReason}</p>
            <p><strong>Business inbox:</strong> ${safeInbox}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
        </div>
    `;

    let resendResponse;

    try {
        resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "SpammKing TCG Website <website@mail.spammkingtcg.co.uk>",
                to: [env.CONTACT_NOTIFICATION_EMAIL],
                reply_to: email,
                subject,
                text,
                html
            })
        });
    } catch {
        return jsonResponse(
            { error: "We could not send your enquiry. Please try again." },
            502
        );
    }

    if (!resendResponse.ok) {
        console.error(
            "Resend contact-form request failed with status",
            resendResponse.status
        );

        return jsonResponse(
            { error: "We could not send your enquiry. Please try again." },
            502
        );
    }

    return jsonResponse({ ok: true });
}
