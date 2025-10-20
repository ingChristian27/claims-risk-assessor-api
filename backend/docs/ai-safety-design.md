# AI Safety Design

## Human-in-the-Loop Pattern

### The Problem
AI models can hallucinate or make incorrect recommendations, especially in high-stakes domains like insurance claims.

### Our Solution
**All claims require human review for final decision.**

```
AI suggests → Human decides
```

## Implementation

### Status Flow
```
1. Claim submitted → status: PENDING
2. AI analyzes → aiRecommendation: APPROVE/REJECT/MANUAL_REVIEW
3. System overrides → status: MANUAL_REVIEW (always)
4. Human reviews → status: APPROVED/REJECTED
```

### AI Recommendations (Based on Risk Score)

| Risk Score | AI Recommendation | Claim Status | Who Decides |
|------------|------------------|--------------|-------------|
| 0-30 | APPROVE | MANUAL_REVIEW | Human |
| 31-70 | MANUAL_REVIEW | MANUAL_REVIEW | Human |
| 71-100 | REJECT | MANUAL_REVIEW | Human |

### Post-AI Validation

The system validates AI responses to prevent hallucination:

```typescript
// Domain logic overrides AI if inconsistent
if (riskScore <= 30 && aiRecommendation !== 'APPROVE') {
  recommendedAction = 'APPROVE'; // Override AI
}
```

**Location**: `src/domain/services/RiskAssessmentService.ts` → `getExpectedAction()`

## Why This Matters

1. **Safety First**: No auto-approval/rejection of claims
2. **AI as Assistant**: AI suggests, humans decide
3. **Prevent Hallucination**: Business rules override AI inconsistencies
4. **Compliance**: Human oversight meets regulatory requirements
5. **Trust**: Explainable decisions (AI reasoning + human review)

## Code Implementation

```typescript
// Claim entity prevents AI auto-decisions
class Claim {
  setAIRecommendation(recommendation: RecommendedAction) {
    this.aiRecommendation = recommendation;
    this.status = ClaimStatus.MANUAL_REVIEW; // Always manual review
  }
  
  humanApprove() {
    this.status = ClaimStatus.APPROVED; // Only humans can approve
  }
}
```

---

**This pattern is production-ready for insurance and financial systems where AI errors can have significant consequences.**

