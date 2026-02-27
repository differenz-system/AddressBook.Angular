# 📘 AddressBookAngular

Address Book web application built with **Angular 20**.
This application allows users to manage personal contacts with add, edit, update, and list functionality using REST APIs.

---

## 🚀 Features

* User-based address listing
* Add new address
* Edit and update existing address
* Reactive form validation
* Email validation
* 10-digit contact number validation
* Active / Inactive status management
* REST API integration using Angular HttpClient
* Angular Material UI

---

## 🛠 Tech Stack

* Angular 20
* Angular Router
* Reactive Forms
* RxJS
* Angular Material
* TypeScript
* REST API (Node.js / Express)

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone 
cd AddressBookAngular
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

## ▶️ Development Server

```bash
ng serve
```

Open in browser:

```
http://localhost:4200/
```

---

## 🏗 Build

```bash
ng build
```

Production build:

```bash
ng build --configuration production
```

---

## 🧪 Running Unit Tests

```bash
ng test
```

---

## ⚙️ Requirements

* Node.js 20+
* Angular CLI 20+

Check versions:

```bash
node -v
ng version
```

---

## 📡 API Configuration

Edit:

```
src/environments/environment.ts
```

Example:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8800'
};
```

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
 │   └── models/
 ├── assets/
 ├── environments/
```

