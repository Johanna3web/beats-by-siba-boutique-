
-- Rename Stripe columns to PayFast equivalents
ALTER TABLE public.orders RENAME COLUMN stripe_payment_intent_id TO payfast_payment_id;
ALTER TABLE public.orders RENAME COLUMN stripe_session_id TO payfast_token;
