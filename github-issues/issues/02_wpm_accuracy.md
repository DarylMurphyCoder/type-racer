# Accurate WPM and accuracy calculations

As a user, I want the app to calculate WPM and accuracy correctly so I can trust the results.

Acceptance criteria

- Given test input, when results are computed, then WPM is shown using the chosen formula:
  - WPM = (correct characters / 5) / minutes
- Given mistakes, when accuracy is displayed, then it's calculated as (correct characters / total characters typed) * 100%.

Definition of done

- Calculation code with unit tests for multiple scenarios (perfect, all wrong, mixed), accompanied by brief documentation.

Priority: High
Estimate: 3 pts
Labels: user-story, priority:high