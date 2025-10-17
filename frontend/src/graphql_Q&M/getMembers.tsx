// getMembers.tsx
export async function getMembersFromDB() {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          viewMembers {
            name
            email
            rollNumber
            team
            status
            start
            end
            photoUrl
          }
        }
      `
    }),
  });
  const { data } = await res.json();
  return data?.viewMembers || [];
}
