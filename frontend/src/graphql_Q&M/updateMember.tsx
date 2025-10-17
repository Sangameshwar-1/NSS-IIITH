// updateMember.tsx
export interface MemberUpdateInput {
  id: string;
  name: string;
  email: string;
  rollNumber?: string | null;
  role?: string | null;
  year?: string | null;
  department?: string | null;
  team: string;
  status: string;
  start?: string | null;
  end?: string | null;
  photoUrl?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  bio?: string | null;
  achievements?: string[] | null;
  interests?: string[] | null;
}

export async function updateMember(memberData: MemberUpdateInput) {
  try {
    const res = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation ChangeMember($member: MemberInput!) {
            changeMember(member: $member)
          }
        `,
        variables: {
          member: memberData
        }
      }),
    });

    const data = await res.json();
    
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(data.errors[0]?.message || "Failed to update member");
    }

    return data.data.changeMember;
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
}
