import apiRoute from "./apiRoute";

async function fetchUsers() {
  const res = await apiRoute.get("users/get");
  if (res.status !== 200) {
    throw new Error("Failed to fetch users");
  }

  return res.data;
}

export { fetchUsers };
