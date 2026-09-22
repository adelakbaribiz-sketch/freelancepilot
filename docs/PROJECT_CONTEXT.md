# Project Context

## Origin

FreelancePilot started from a real, specific problem: a Persian-speaking
freelancer registered on Upwork and Freelancer.com struggling with (1)
platform authentication friction, (2) receiving and cashing out
international income, (3) writing native-quality English proposals, and (4)
monitoring multiple platforms by hand, in a market where these platforms
offer no public API and actively block scraping.

An earlier planning pass explored two architectures for solving this: a
low-code n8n/Docker automation workflow, and a full custom microservices
platform (Next.js + NestJS/FastAPI + Kafka + Temporal + Keycloak +
Kubernetes, with local/cloud LLMs, RAG, and OCR). Both are real, useful
designs — but neither had been built. What existed was documentation: JSON
workflow exports, a docker-compose file, and architecture write-ups, with no
running code, no repository, and unresolved questions about the two hardest
problems (marketplace authentication and cross-border payouts).

## What this repository is

This repository turns that concept into a **portfolio-ready product demo**:
a frontend-complete, honestly-labeled simulation of the product experience,
built to a professional UI/UX bar, with the target production architecture
documented (not built) so the gap between demo and real product is explicit
rather than implied.

## Why frontend-first, not the full microservices build

Building Kafka, Temporal, Keycloak, and a Kubernetes-orchestrated
microservice mesh for a project with zero real users, zero real backend
integrations, and two legally/technically unresolved core problems
(marketplace auth bypass, cross-border payouts) would be pure waste — a lot
of infrastructure demonstrating nothing a reviewer could actually use or
trust. The product's real value, at this stage, is in the *experience*: can
a non-native-English freelancer actually understand and act on a project
through this tool? That's answerable with a well-built frontend over a
realistic mock data layer, and it's what a hiring manager, investor, or
early user can actually click through today.

The production architecture that *would* be needed is fully specified in
[ARCHITECTURE.md](ARCHITECTURE.md), scoped down from the original dossier to
what an MVP actually needs (see [DECISIONS.md](DECISIONS.md) for what was
cut and why).

## Who this is for

- **Primary user (in-product persona):** a freelancer whose first language
  isn't English, working across multiple freelance marketplaces, who needs
  translation and native-quality proposal drafting to compete effectively.
- **Reviewer of this repository:** a hiring manager, technical reviewer, or
  potential collaborator evaluating product thinking, frontend engineering
  quality, and the ability to scope a large, ambiguous idea into something
  real and honestly presented.

## Relationship to the original concept

Everything in the original dossier that could not be honestly demonstrated
without a real backend, real marketplace access, or real financial
integration was either (a) simulated with a clear label, (b) documented as a
proposed future phase, or (c) explicitly dropped as out of scope for a demo.
See [LIMITATIONS.md](LIMITATIONS.md) for the exact breakdown.
