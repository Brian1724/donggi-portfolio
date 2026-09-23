# Follow-up issues

## Contact form with Cloudflare Worker and Turnstile

Keep the current prefilled `mailto:` links as the no-backend default. If direct form submission becomes necessary, add a small Cloudflare Worker endpoint with Turnstile verification, strict origin checks, input length limits, and rate limiting. Store no message content beyond delivery and keep the email destination in Worker secrets.

This should be handled separately because it introduces a server-side endpoint, abuse controls, and deployment secrets to an otherwise static site.
