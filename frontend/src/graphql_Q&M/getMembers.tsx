// getMembers.tsx
export async function getMembersFromDB() {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          viewMembers {
            id
            name
            email
            rollNumber
            role
            year
            department
            team
            status
            start
            end
            photoUrl
            phone
            linkedin
            github
            bio
            achievements
            interests
          }
        }
      `
    }),
  });
  const { data } = await res.json();
  return data?.viewMembers || [];
}
