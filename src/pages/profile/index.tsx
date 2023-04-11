import { protectAuthRoute } from "~/protectedRoute";

export default function Profile() {
  return (
    <div>Profile</div>
  );
}

export const getServerSideProps = protectAuthRoute;