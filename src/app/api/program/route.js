import { query } from "@/lib/db";


export async function GET() {
    const programs = await query({
        query: "SELECT * FROM program",
        values: [],
    });


    let data = JSON.stringify(programs);
    return new Response(data, {
        status: 200,
    });
}


export async function POST(request) {


    const { pgm_name } = await request.json();
    const updateprograms = await query({
        query: "INSERT INTO program (pgm_name) VALUES (?)",
        values: [pgm_name],
    });
    const result = updateprograms.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const programs = {
        pgm_name: pgm_name,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        programs: programs
    }));
}
