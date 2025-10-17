// admin.ts - Admin GraphQL operations

// ============= MEMBERS =============

export async function getAllMembers() {
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

export async function addMember(member: any) {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation AddMember($member: MemberInput!) {
          addMember(member: $member)
        }
      `,
      variables: { member }
    }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data?.addMember;
}

export async function updateMember(member: any) {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation ChangeMember($member: MemberInput!) {
          changeMember(member: $member)
        }
      `,
      variables: { member }
    }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data?.changeMember;
}

export async function deleteMember(id: string) {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation DeleteMember($id: String!) {
          deleteMember(id: $id)
        }
      `,
      variables: { id }
    }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data?.deleteMember;
}

// ============= EVENTS =============

export async function getAllEvents() {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          viewEvents {
            name
            startTime
            endTime
            location
            description
            eventHead {
              id
              name
              email
            }
          }
        }
      `
    }),
  });
  const { data } = await res.json();
  return data?.viewEvents || [];
}

export async function addEvent(event: any, head?: any) {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation AddEvent($event: EventInput!, $head: MemberInput) {
          addEvent(event: $event, head: $head)
        }
      `,
      variables: { event, head }
    }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data?.addEvent;
}

export async function updateEvent(event: any, head?: any) {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation ChangeEvent($event: EventInput!, $head: MemberInput) {
          changeEvent(event: $event, head: $head)
        }
      `,
      variables: { event, head }
    }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data?.changeEvent;
}

export async function deleteEvent(name: string) {
  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation DeleteEvent($name: String!) {
          deleteEvent(name: $name)
        }
      `,
      variables: { name }
    }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data?.deleteEvent;
}
