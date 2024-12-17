import { query } from "@/lib/db";


export async function GET() {
    const titles = await query({
        query: "SELECT * FROM project_status",
        values: [],
    });


    let data = JSON.stringify(titles);
    return new Response(data, {
        status: 200,
    });
}


export async function POST(request) {


    const { pjs_name } = await request.json();
    const updateTitles = await query({
        query: "INSERT INTO project_status (pjs_name) VALUES (?)",
        values: [pjs_name],
    });
    const result = updateTitles.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const titles = {
        pjs_name: pjs_name,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        titles: titles
    }));
}
