
---

# **stack.md**

```markdown
# LEGO Builder Web App — Technical Stack

## 1. Frontend

### Framework
- **Next.js 14**  
- App Router  
- Client components for 3D interaction  
- Server components for data prefetching (optional)

### Language
- **TypeScript**

### 3D Rendering
- **Three.js**
- **@react-three/fiber** — React wrapper for Three.js
- **@react-three/drei** — grid helpers, camera controls, loaders

### State Management
- **Zustand**
  - Brick instances
  - Selected brick type & color
  - Sandbox vs challenge mode
  - Challenge inventory state

### UI Components
- **Shadcn** or **Radix UI**

### Build Tools
- pnpm or yarn
- Next dev server
- ESLint + Prettier

---

## 2. Backend

### Framework
- **FastAPI** (Python)

### Responsibilities
- Wrap Rebrickable API
- Serve challenge definitions
- Save/load builds
- Resolve mesh URLs for part types

### Libraries
- httpx (API calls)
- pydantic (schemas)
- supabase-py (database & storage)
- SQLAlchemy or SQLModel (optional)

---

## 3. Database (Supabase Postgres)

### Purpose
- Persistent user builds
- Challenge definitions
- Brick type reference data

### Tables
- `brick_types (typeId, studWidth, studDepth, heightUnits, meshUrl)`
- `builds (buildId, name, createdBy, createdAt)`
- `brick_instances (instanceId, buildId, typeId, colorId, position, rotation)`
- `challenges (challengeId, targetBuildId)`
- `challenge_allowed_parts (challengeId, typeId, colorId, quantity)`

### Data Format
- JSONB for positions/rotations
- Normalized reference tables for types

---

## 4. Storage (Supabase Storage)

### Used For
- GLB 3D part files

### Structure
/models/parts/{part_type_id}.glb


### Notes
- Store only a small set for V1
- Expand later with LDraw → GLB conversions

---

## 5. External Services

### Rebrickable API
Backend uses for:
- Set search
- Part inventories
- Part metadata

Frontend only hits FastAPI, never Rebrickable directly.

### LDraw (Offline Only)
Used to:
- Provide raw 3D geometry
- Convert to GLB for web rendering

---

## 6. Deployment

### Frontend
- Vercel

### Backend
- Railway / Render / Fly.io  
- Or Supabase Edge Functions if desired

### Environment Variables
- REBRICKABLE_API_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

---

## 7. Development Workflow

1. Frontend: `pnpm dev`
2. Backend: `uvicorn main:app --reload`
3. Supabase: cloud DB or local supabase instance
4. GLB models stored locally first → upload to Supabase Storage

---

## 8. Future Scalability

- GPU instancing for large builds
- Batch loading brick meshes
- Add caching for Rebrickable
- Move validation logic server side
- Add user accounts and public build sharing