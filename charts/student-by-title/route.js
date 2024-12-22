import { query } from "@/lib/db";


export async function GET() {
    const chart = await query({
        query: "SELECT t.ttl_name, COUNT(*) AS total_students FROM student s INNER JOIN title t ON s.std_ttl_id = t.id GROUP BY t.ttl_name;",
        values: [],
    });


    let data = JSON.stringify(chart);
    return new Response(data, {
        status: 200,
    });
}
