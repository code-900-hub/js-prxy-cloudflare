export default {
    async fetch(request) {
    try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
     
    if (!id || !/^\d+$/.test(id)) {
    return new Response(
    JSON.stringify({ error: "Invalid project ID" }),
    {
    status: 400,
    headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
    }
    }
    );
    }
     
    const scratchResponse = await fetch(
    `https://projects.scratch.mit.edu/${id}`,
    {
    headers: {
    Referer: "https://scratch.mit.edu/"
    }
    }
    );
     
    if (!scratchResponse.ok) {
    return new Response(
    JSON.stringify({
    error: `Scratch returned ${scratchResponse.status}`
    }),
    {
    status: scratchResponse.status,
    headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
    }
    }
    );
    }
     
    return new Response(
    await scratchResponse.arrayBuffer(),
    {
    headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=3600"
    }
    }
    );
    } catch (err) {
    return new Response(
    JSON.stringify({
    error: err.message
    }),
    {
    status: 500,
    headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
    }
    }
    );
    }
    }
    };