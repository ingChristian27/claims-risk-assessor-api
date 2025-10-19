# AI Safety Design

## Problem
AI models hallucinate. Auto-approving/rejecting insurance claims based solely on AI is risky.

## Solution: Human-in-the-Loop

**AI recommends. Humans decide.**

### Status Flow
```
PENDING → AI evaluates → MANUAL_REVIEW → Human decides → APPROVED/REJECTED
```

### Implementation
```typescript
class Claim {
  status: ClaimStatus;              // PENDING | MANUAL_REVIEW | APPROVED | REJECTED
  aiRecommendation?: RecommendedAction;  // What AI suggests
  
  setAIRecommendation(recommendation: RecommendedAction): void {
    this.aiRecommendation = recommendation;
    this.status = ClaimStatus.MANUAL_REVIEW;  // Always
  }
}
```

### Key Points

1. **AI never auto-approves/rejects** - Always sets status to `MANUAL_REVIEW`
2. **Separate fields** - `status` (human-controlled) vs `aiRecommendation` (AI suggestion)
3. **Audit trail** - Know what AI suggested and what human decided

### Example
```json
{
  "claimId": "abc-123",
  "status": "MANUAL_REVIEW",
  "aiRecommendation": "APPROVE",
  "riskAssessment": {
    "riskScore": 15,
    "category": "AUTO"
  }
}
```

## Alternative Approaches

Other techniques to prevent AI hallucination:

1. **Multi-AI Validation** - Send to 2+ models, flag if disagree (higher cost)
2. **Confidence Threshold** - Auto-approve only if AI confidence > 95%
3. **Ensemble Models** - Combine AI + business rules with voting

## Why Human-in-the-Loop?

✅ Simplest to implement  
✅ Highest safety guarantee  
✅ Regulatory compliance  
✅ Clear audit trail  

**Future**: Multi-AI validation for high-value claims (> $10,000).
