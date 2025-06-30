## 🧪 **Exploratory Testing Summary – Goodbudget App**

### ✅ **Testing Charters**

| Charter ID | Title                                         | Description                                                                                                             |
| ---------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **C1**     | **Dashboard Rendering & Envelope Visibility** | Validate envelope and account balances, check UI consistency, and confirm sync status across devices.                   |
| **C2**     | **Transaction Flow Quality**                  | Test creation, editing, and deletion of transactions, ensuring accuracy of fields (date, amount, payee, notes).         |
| **C3**     | **Data Sync Across Devices**                  | Validate real-time sync between web and mobile (including offline scenarios), and ensure cross-session data integrity.  |
| **C4**     | **Navigation & ARIA/Keyboard**                | Assess keyboard navigation, screen-reader labels, and responsive UI behavior across screen sizes.                       |
| **C5**     | **Input Validation & Error Handling**         | Confirm field validations (e.g. required fields, valid formats) and ensure appropriate error handling from the server.  |
| **C6**     | **Performance & Accessibility**               | Evaluate load performance, responsiveness, and accessibility (color contrast, screen reader compatibility).             |
| **C7**     | **API Error Handling**                        | Monitor API behavior during create/edit operations, simulate failures, and verify graceful degradation and retry logic. |
| **C8**     | **Security & Session Handling**               | Inspect local storage, cookies, and session expiry behavior for secure flag use and compliance with best practices.     |
| **C9**     | **Privacy & Compliance**                      | Validate GDPR/CCPA compliance features (cookie banners, privacy policy, data export/deletion).                          |

---

### 🐞 **Key Findings**

| Finding                                              | Description                                                                                                  | Related Charter |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------- |
| **Missing GDPR Consent Banner**                      | No cookie/GDPR consent banner shown on initial visit – raises compliance concerns (especially for EU users). | **C9**          |
| **Unexpected Redirects During Navigation**           | Navigating to "Edit Accounts" or "Home" prompts a confusing external redirect message from Chrome.           | **C4**          |
| **Inconsistent Focus Indicators**                    | Primary buttons and dropdowns lack visible focus states, impacting keyboard and assistive tech usability.    | **C4, C6**      |
| **Sync Delay (~5s) Between Web & Mobile**            | Observable lag in data syncing across platforms; could lead to inconsistent experiences.                     | **C3**          |
| **Input Field Not Autofocused on Add/Edit Envelope** | When adding an envelope, input field does not receive immediate focus, affecting flow.                       | **C2, C5**      |

---

### 📌 **Charter Prioritization**

| Priority      | Charter                                            | Justification                                                                   |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| 🟢 **High**   | **C5 – Input Validation & Error Handling**         | Prevents data corruption and user frustration due to incorrect input handling.  |
| 🟢 **High**   | **C7 – API Error Handling**                        | Ensures reliability during API disruptions and helps maintain data consistency. |
| 🟢 **High**   | **C6 – Performance & Accessibility**               | Impacts all users; critical for inclusivity and retention.                      |
| 🟡 **Medium** | **C8 – Security & Session Handling**               | Affects session trust and user data protection.                                 |
| 🟡 **Medium** | **C2 – Transaction Flow Quality**                  | Core to budgeting function – must be intuitive and error-free.                  |
| 🟡 **Medium** | **C3 – Data Sync Across Devices**                  | Important for a seamless cross-device experience.                               |
| 🟠 **Low**    | **C4 – Navigation & ARIA/Keyboard**                | Valuable for accessibility compliance and usability.                            |
| 🟠 **Low**    | **C1 – Dashboard Rendering & Envelope Visibility** | Visual consistency matters, but less critical than data integrity.              |
| 🟠 **Low**    | **C9 – Privacy & Compliance**                      | Legal priority; easy to fix, but needs swift resolution.                        |

---

### ⚠️ **Risk Mitigation Strategy for Web-Based Budgeting Apps**

| # | Risk Area                         | Mitigation Strategy                                                            |
| - | --------------------------------- | ------------------------------------------------------------------------------ |
| 1 | **Data Loss/Sync Conflicts**      | Implement transaction queuing, status indicators, and automatic retry logic.   |
| 2 | **Input Errors & Poor UX**        | Use real-time validation, clear error messages, and contextual help.           |
| 3 | **Performance Bottlenecks**       | Minify assets, defer non-critical scripts, and optimize render paths.          |
| 4 | **Accessibility Gaps**            | Add ARIA roles, keyboard focus states, and meet WCAG 2.1 compliance.           |
| 5 | **Security Vulnerabilities**      | Sanitize inputs, enforce HTTPS, use secure flags on cookies.                   |
| 6 | **Session Management Issues**     | Provide "stay logged in" options and explain session limits clearly.           |
| 7 | **Privacy & Compliance**          | Ensure GDPR/CCPA compliance with banners, privacy settings, and data controls. |
| 8 | **Cross-Browser Inconsistencies** | Regularly test and normalize layouts across major browsers and devices.        |

