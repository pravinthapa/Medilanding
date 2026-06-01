# MongoDB Atlas setup for MediCare (medicare project)

Your **502 error** happens because the API cannot connect to a database.  
Local MongoDB (`127.0.0.1:27017`) is not running. Use **MongoDB Atlas** instead.

> I cannot log into your Atlas account. You complete these steps in your browser, then paste the connection string into `server/.env`.

## Step 1 — Open your project

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Open project **medicare** (you already created this)

## Step 2 — Create a free cluster (if you don’t have one)

1. Left menu → **Database** → **Create** (or **Build a Database**)
2. Choose **M0 FREE**
3. Provider: **AWS** (or any), Region: closest to you
4. Cluster name: e.g. `medicare-cluster` → **Create**

Wait until status is **Active** (a few minutes).

## Step 3 — Database user (login for the app)

1. Left menu → **Database Access** → **Add New Database User**
2. Authentication: **Password**
3. Username: `medicare_admin` (or any name)
4. Password: click **Autogenerate Secure Password** → **copy and save it**
5. Built-in Role: **Atlas admin** (for dev) OR **Read and write to any database**
6. **Add User**

## Step 4 — Network access (allow your PC)

1. Left menu → **Network Access** → **Add IP Address**
2. For development click **Allow Access from Anywhere** (`0.0.0.0/0`)  
   *(For production, use only your server IP.)*
3. **Confirm**

## Step 5 — Get connection string

1. Left menu → **Database** → on your cluster click **Connect**
2. Choose **Drivers**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string. It looks like:

```
mongodb+srv://medicare_admin:<password>@medicare-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. Replace `<password>` with your real password (from Step 3).  
   If the password has special characters (`@`, `#`, `%`), [URL-encode](https://www.urlencoder.org/) them.

6. Add database name at the end (before `?` or replace `?`):

```
mongodb+srv://medicare_admin:YOUR_PASSWORD@medicare-cluster.xxxxx.mongodb.net/medilanding?retryWrites=true&w=majority
```

## Step 6 — Paste into this project

Open `server/.env` and set:

```env
MONGODB_URI=mongodb+srv://medicare_admin:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/medilanding?retryWrites=true&w=majority
```

Save the file.

## Step 7 — Seed and run

In terminal, from project root:

```bash
npm run seed
npm run dev
```

- Site: http://localhost:5173  
- Register: http://localhost:5173/admin/register  

If seed succeeds, you will see: `Seed completed!` and admin login details.

## Troubleshooting

| Problem | Fix |
|--------|-----|
| 502 Bad Gateway | Backend not running → run `npm run dev`; check terminal for MongoDB errors |
| `bad auth` | Wrong password in URI or password not URL-encoded |
| `IP not whitelisted` | Network Access → add `0.0.0.0/0` or your IP |
| `ECONNREFUSED 127.0.0.1` | Still using local URI → switch to Atlas `mongodb+srv://...` |

## Send me the string (optional)

If you want help checking the format, paste **only** the URI with the password replaced by `****` — never share your real password in chat.
