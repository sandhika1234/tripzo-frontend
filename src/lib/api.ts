const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ─── Core fetch wrapper ─────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("tripzo_token") : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

// ─── AUTH ────────────────────────────────────────────────

export const authApi = {
  register: (data: {
    name: string;
    phone: string;
    email?: string;
    password: string;
    city?: string;
    role?: string;
  }) => apiFetch<any>("/auth/register", { method: "POST", body: JSON.stringify(data) }),

  login: (phone: string, password: string) =>
    apiFetch<any>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, password }),
    }),

  sendOtp: (phone: string) =>
    apiFetch<any>("/auth/send-otp", { method: "POST", body: JSON.stringify({ phone }) }),

  verifyOtp: (phone: string, code: string) =>
    apiFetch<any>("/auth/verify-otp", { method: "POST", body: JSON.stringify({ phone, code }) }),

  getProfile: () => apiFetch<any>("/auth/profile"),
};

// ─── VEHICLES ────────────────────────────────────────────

export const vehiclesApi = {
  search: (params?: {
    city?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) => {
    const query = new URLSearchParams();
    if (params?.city) query.set("city", params.city);
    if (params?.category) query.set("category", params.category);
    if (params?.page) query.set("page", params.page.toString());
    if (params?.limit) query.set("limit", params.limit.toString());
    return apiFetch<any>(`/vehicles?${query.toString()}`);
  },

  getById: (id: string) => apiFetch<any>(`/vehicles/${id}`),

  create: (data: any) =>
    apiFetch<any>("/vehicles", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: any) =>
    apiFetch<any>(`/vehicles/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: string) =>
    apiFetch<any>(`/vehicles/${id}`, { method: "DELETE" }),

  toggleStatus: (id: string) =>
    apiFetch<any>(`/vehicles/${id}/toggle-status`, { method: "PUT" }),

  getMyVehicles: () => apiFetch<any>("/vehicles/supplier/my-vehicles"),
};

// ─── BOOKINGS ────────────────────────────────────────────

export const bookingsApi = {
  create: (data: {
    vehicleId: string;
    pickupDate: string;
    returnDate: string;
    pickupTime: string;
    returnTime: string;
  }) => apiFetch<any>("/bookings", { method: "POST", body: JSON.stringify(data) }),

  getMyBookings: (status?: string) =>
    apiFetch<any>(`/bookings/my-bookings${status ? `?status=${status}` : ""}`),

  getSupplierBookings: (status?: string) =>
    apiFetch<any>(`/bookings/supplier-bookings${status ? `?status=${status}` : ""}`),

  updateStatus: (id: string, status: string) =>
    apiFetch<any>(`/bookings/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  cancel: (id: string) =>
    apiFetch<any>(`/bookings/${id}/cancel`, { method: "PUT" }),

  adminGetAll: (status?: string) =>
    apiFetch<any>(`/bookings/admin/all${status ? `?status=${status}` : ""}`),
};

// ─── USERS ───────────────────────────────────────────────

export const usersApi = {
  updateProfile: (data: any) =>
    apiFetch<any>("/users/profile", { method: "PUT", body: JSON.stringify(data) }),

  updateKyc: (data: any) =>
    apiFetch<any>("/users/kyc", { method: "PUT", body: JSON.stringify(data) }),

  adminGetCustomers: () => apiFetch<any>("/users/admin/customers"),

  adminGetSuppliers: () => apiFetch<any>("/users/admin/suppliers"),

  adminUpdateKycStatus: (id: string, status: string) =>
    apiFetch<any>(`/users/admin/${id}/kyc-status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  adminToggleBlock: (id: string) =>
    apiFetch<any>(`/users/admin/${id}/toggle-block`, { method: "PUT" }),

  adminDashboardStats: () => apiFetch<any>("/users/admin/dashboard-stats"),
};
