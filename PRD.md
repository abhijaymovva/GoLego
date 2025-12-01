# LEGO Builder Web App — Product Requirements Document (PRD)

## 1. Overview

The LEGO Builder Web App is a browser based 3D environment that allows users to build LEGO style structures digitally. The product includes two core modes:

1. **Sandbox Mode**
   A fully open creative environment where the user can freely place bricks of any type and color.

2. **Challenge Mode**
   A restricted build environment where users recreate predefined LEGO sets using limited brick inventory and a target model.

The goal is to deliver a smooth, intuitive, and accurate LEGO building experience using real part data from the Rebrickable API, with all 3D rendering done client side.

---

## 2. Goals

### Primary Goals
- Provide a performant 3D sandbox for placing, moving, rotating, and deleting LEGO bricks.
- Implement a snapping system that mimics real LEGO connections.
- Support challenge mode with:
  - Limited part inventory
  - Target build validation
- Integrate with Rebrickable to fetch set inventories and part metadata.
- Provide persistent build storage using Supabase.

### Non Goals (for now)
- Multiplayer or collaborative building
- Physics simulation
- Complex LEGO Technic-style connections
- Mobile optimized version
- Full part catalog rendering of thousands of parts

---

## 3. Core Features

### 3.1 Brick Library (Essential)
- Panel listing available brick types (start with ~5 core bricks)
- Color selector
- Search/filter once library expands

### 3.2 3D Workspace
- Orbit camera (pan, zoom, rotate)
- Ground grid
- Snapping system based on stud alignment
- Ability to:
  - Place bricks
  - Select and move bricks
  - Rotate bricks (90 degree increments)
  - Delete bricks
- Smooth, low latency interactions

### 3.3 Sandbox Mode
- Unlimited bricks
- Any color, any type
- Save build to Supabase
- Load build on demand

### 3.4 Challenge Mode
- Load a challenge:
  - Allowed parts list
  - Target build (JSON)
- UI shows remaining inventory
- User builds inside same engine as sandbox
- Validation:
  - Match brick count
  - Match positions within tolerance
  - Match rotations
- Success/failure state returned to frontend

### 3.5 Data Integration (Rebrickable)
Uses Rebrickable API for:
- Set search
- Set part inventory
- Part metadata (names, colors)

Backend wraps the API so the frontend uses simple, predictable endpoints.

### 3.6 3D Assets Pipeline
- Store GLB files in Supabase Storage
- Map:
  - `part_type_id` → `mesh_url`
- Future expansion: convert LDraw parts to GLB offline

---

## 4. System Architecture

### 4.1 Frontend (Next.js + React + TypeScript)
- React Three Fiber for 3D rendering
- Zustand for global state
- Server side routes for rendering challenge pages
- Hit FastAPI for:
  - Challenge definitions
  - Set inventories
  - Build saves

### 4.2 Backend (FastAPI + Python)
- Acts as the orchestrator between:
  - Frontend
  - Supabase Postgres
  - Rebrickable API
- Simple REST endpoints:
  - `/sets/{id}`
  - `/sets/{id}/parts`
  - `/challenges/{id}`
  - `/builds` (POST and GET)

### 4.3 Database (Supabase Postgres)
Tables:
- `brick_types`
- `builds`
- `brick_instances`
- `challenges`
- `challenge_allowed_parts`

### 4.4 Storage (Supabase Storage)
- `/models/parts/{part_id}.glb`

### 4.5 External API
- Rebrickable API for live set information

---

## 5. Data Models

### Brick Type
```json
{
  "typeId": "3001",
  "name": "Brick 2 x 4",
  "studWidth": 2,
  "studDepth": 4,
  "heightUnits": 3,
  "meshUrl": "/models/parts/3001.glb"
}
Brick Instance
{
  "id": "uuid",
  "typeId": "3001",
  "colorId": "1",
  "position": { "x": 0, "y": 0, "z": 0 },
  "rotation": { "x": 0, "y": 90, "z": 0 }
}

Build
{
  "buildId": "uuid",
  "name": "My Build",
  "bricks": [ ...brick instances... ]
}

Challenge
{
  "challengeId": "uuid",
  "allowedParts": [
    { "typeId": "3001", "colorId": "1", "quantity": 10 }
  ],
  "targetBuildId": "uuid"
}

6. User Flows
Sandbox Flow

User enters sandbox.

Brick library loads.

User builds with CAD tools.

User saves build.

Challenge Flow

User enters a challenge.

App loads:

Allowed parts

Target build

User builds with restrictions.

App validates.

Show success/failure.

7. Milestones
Milestone 1: Core Engine

Basic 3D workspace

Snapping

Placement, move, rotate, delete

Three brick types

Milestone 2: Sandbox Mode

Brick panel

Color selection

Save + load builds

Milestone 3: Challenge Mode (Basic)

Hardcoded challenge

Limited inventory

Position/rotation validation

Milestone 4: Rebrickable Integration

Backend set search + parts

Auto generate challenge from real set

Milestone 5: V1 Launch

Stable sandbox

Functional challenge mode

Hosted backend + frontend

8. Risks / Constraints

Snapping accuracy must be smooth

Performance issues for large builds

Rebrickable rate limits

GLB conversion pipeline consistency

9. Success Criteria

Snappy sub 10ms placement interactions

Sandbox builds load/save reliably

At least one official set reproducible in challenge mode

Smooth user experience in browser