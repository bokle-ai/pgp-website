# Send site-visit form leads to Google Sheets

The "Book a site visit" form posts each submission to a Google Apps Script,
which appends a row to your Sheet (and emails you an alert). Free, no signup.

## 1. Create the Sheet
1. Go to <https://sheets.google.com> and create a blank spreadsheet.
2. Name it e.g. **PGP Leads**. Leave row 1 empty — the script writes a header.

## 2. Add the script
1. In the Sheet: **Extensions → Apps Script**.
2. Delete any sample code and paste in the contents of
   [`google-sheets-leads.gs`](./google-sheets-leads.gs) (in this folder).
3. In that file, set `NOTIFY_EMAIL` to where you want lead alerts
   (e.g. `info@primegoldenproperties.in`), or leave it blank for no email.
4. Click **Save**.

## 3. Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Set:
   - **Description:** PGP leads
   - **Execute as:** Me
   - **Who has access:** **Anyone**  ← important
4. Click **Deploy**, authorize when prompted (choose your account → Advanced →
   "Go to project (unsafe)" → Allow — it's your own script).
5. Copy the **Web app URL** (ends in `/exec`).

## 4. Plug the URL into the site
- **Local:** put it in `.env.local`:
  ```
  NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
  ```
- **Live (Netlify):** Site settings → **Environment variables** → add
  `NEXT_PUBLIC_SHEETS_ENDPOINT` with the same URL → **Trigger redeploy**.

That's it. Submit the form once and you'll see a new row + an email.

## Updating the script later
If you edit the `.gs` code, **Deploy → Manage deployments → Edit (pencil) →
Version: New version → Deploy**. The `/exec` URL stays the same.
