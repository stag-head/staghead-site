# ForecastCentral Screenshot Shot List

Save each PNG into `assets/forecastcentral/` using the file name shown. The pages pick them up automatically, with no HTML edits.
This folder is not git-ignored, so the screenshots deploy with the site. Do not put them under `assets/screenshots/`, which is ignored.

## Capture notes
- Browser: Chrome, 1920x1200 or similar wide viewport, BC zoom 100%
- Environment: SH-Sandbox with the DEMO-* data generated (M1 review step 9)
- Format: PNG, cropped to the content area

| # | File | Page | What to show |
|---|------|------|--------------|
| 1 | `setup-01-wizard.png` | setup | The setup wizard: Assisted Setup wizard, a middle step with the progress list visible. |
| 2 | `setup-02-planning-setup.png` | setup | Planning setup: Planning Setup page with the General, Calendar, History and Demo data FastTabs open. |
| 3 | `setup-03-health-check.png` | setup | Health check: Planning Health Check with at least one problem listed and the Fix action visible. |
| 4 | `history-01-entries.png` | demand-history | Demand history entries: Demand History list with a sale selected and the Exclude with Reason action visible. |
| 5 | `history-02-periods.png` | demand-history | Weekly periods: Demand History Periods filtered to one item, showing weeks with the Outlier Adjustment column. |
| 6 | `history-03-import.png` | demand-history | Import and reconciliation: History Import with a loaded file, and the Reconciliation page showing zero differences. |
| 7 | `plans-01-matrix.png` | demand-plans | Item by period matrix: Demand plan matrix with items down the side and months across. |
| 8 | `plans-02-compare.png` | demand-plans | Comparing scenarios: Scenario compare page with variance columns. |
| 9 | `plans-03-excel-diff.png` | demand-plans | Excel import review: Import review page showing the difference against the active plan. |
| 10 | `suggestions-01-list.png` | suggestions | Suggestions with a headline: Suggestion list with the one-line explanation on each row. |
| 11 | `suggestions-02-explain.png` | suggestions | The Explain view: Explain page for one suggestion showing demand, projection, trigger, target, rounding and dates. |
| 12 | `suggestions-03-exceptions.png` | suggestions | Exceptions: Exceptions list with a late supply and a shortage. |
| 13 | `locks-01-statuses.png` | supply-locks | Supply statuses: Supply Status list with the Planning Locked column. |
| 14 | `locks-02-rules.png` | supply-locks | Supply lock rules: Supply Lock Rules page showing which rules are on. |
| 15 | `locks-03-purchase-line.png` | supply-locks | On the water: A purchase order line showing the on-the-water status and shipment reference. |
| 16 | `workbench-01-queue.png` | workbench | Vendor queue: Workbench queue for one vendor with urgency and minimum order status. |
| 17 | `workbench-02-card.png` | workbench | Item planning card: Item planning card with the history, plan and projected stock chart. |
| 18 | `workbench-03-order.png` | workbench | Creating orders: Create orders confirmation and the resulting purchase order. |

Parts marked Planned (demand plans, workbench) cannot be captured until those milestones are built. Their placeholders show until then.
