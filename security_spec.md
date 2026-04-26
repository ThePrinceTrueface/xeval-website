# Security Spec: xeval.js Comments

## Data Invariants
1. A comment must have a valid `userId` matching the authenticated user.
2. `createdAt` must be set to `request.time`.
3. `text` must be a string between 1 and 500 characters.
4. `userName` must be the user's name from auth.

## The Dirty Dozen (Attacker Payloads)

1. **Identity Spoofing**: Attempt to post a comment with another user's UID.
2. **Resource Poisoning**: Document ID with 2KB string.
3. **Ghost Fields**: Adding `isAdmin: true` to a comment document.
4. **Massive Payload**: Posting a 1MB comment text.
5. **Unauthorized Update**: Attempt to edit someone else's comment.
6. **Unauthorized Delete**: Attempt to delete someone else's comment.
7. **Bypassing Verification**: Posting with an unverified email account.
8. **Client Time Spoofing**: Setting `createdAt` to a date in the past/future manually.
9. **Anonymous Posting**: Attempting to post without being signed in.
10. **Query Scraping**: Attempting to list all comments if they were private (not applicable here as comments are usually public, but good to test).
11. **Type Poisoning**: Sending `text` as a boolean.
12. **System Field Injection**: Attempting to set a `modStatus` field during creation.

## Rules Draft
(I will implement these in firestore.rules)
