# Interrupted tests: recovery and messaging

As a user, I want clear error handling when a test is interrupted (lost connection or accidental navigation) so I know if my attempt was saved.

Acceptance criteria

- Given the test was interrupted, when I return, then the app either recovers the in-progress test or clearly indicates it was not saved and offers to retry.

Definition of done

- Recovery/resume or explicit discard flow implemented.

Priority: High
Estimate: 3 pts
Labels: user-story, priority:high