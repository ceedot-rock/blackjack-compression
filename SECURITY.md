# Security Policy

blackjack-compression is a decompression library, and its decoder eats
untrusted bytes. A bug that lets crafted input hang, crash, or over-allocate
is a security issue, not a normal bug.

## Reporting a vulnerability

Please do not open a public issue for security problems.

- Email: corey@slidphilabs.com with the subject line `blackjack-compression security`
- Or use GitHub's private vulnerability reporting on this repository
  (Security tab, "Report a vulnerability")

Include the affected function or codec path, the inputs to reproduce, and
what you expected versus what happened.

You can expect an acknowledgement within 3 business days. We will keep you
updated while we investigate and credit you in the changelog unless you
prefer to stay anonymous.

## In scope

- Round-trip breakage: `decompress(compress(x))` != `x`
- Decoder denial-of-service: crafted compressed input that hangs, loops
  forever, or allocates unbounded memory
- Incorrect decode output that silently corrupts data
- The `blackjack-compression` npm package

## Out of scope

- The hosted API the npm stub talks to (that is a separate hosted product)
- Operator deployments we do not run
- Social engineering, spam, or denial-of-service against the demo page
