// getMemberByUsername.tsx
export async function getMemberByUsername(username: string) {
  try {
    const res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetMemberByUsername($username: String!) {
            getMemberByUsername(username: $username) {
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
        `,
        variables: {
          username: username
        }
      }),
      cache: "no-store",
    });

    const data = await res.json();
    
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return null;
    }

    return data.data.getMemberByUsername;
  } catch (error) {
    console.error("Error fetching member:", error);
    return null;
  }
}
