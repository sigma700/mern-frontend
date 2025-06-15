import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("finding", "routes/finding.jsx"),
  route("listing", "routes/listing.jsx"),
  route("finding/:id", "routes/school.jsx"),
  route("/collection", "routes/collection.jsx"),
  route("/dashboard", "routes/dashboard.jsx"),
];
