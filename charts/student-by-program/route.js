import { query } from "@/lib/db";


export async function GET() {
    const chart = await query({
        query: "SELECT count(*) student_count, pgm_name from student s join program p on s.std_pgm_id=p.id group by pgm_name",
        values: [],
    });


    let data = JSON.stringify(chart);
    return new Response(data, {
        status: 200,
    });
}
 
