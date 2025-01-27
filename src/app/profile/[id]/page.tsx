export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-10">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="p-2 ml-2 bg-orange-500 rounded-sm text-white">
          {params.id}
        </span>
      </p>
    </div>
  );
}
