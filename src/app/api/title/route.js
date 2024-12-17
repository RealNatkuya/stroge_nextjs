import { query } from "@/lib/db";


export async function GET() {
    const titles = await query({
        query: "SELECT * FROM title",
        values: [],
    });


    let data = JSON.stringify(titles);
    return new Response(data, {
        status: 200,
    });
}


export async function POST(request) {


    const { ttl_name } = await request.json();
    const updateTitles = await query({
        query: "INSERT INTO title (ttl_name) VALUES (?)",
        values: [ttl_name],
    });
    const result = updateTitles.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const titles = {
        ttl_name: ttl_name,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        titles: titles
    }));
}