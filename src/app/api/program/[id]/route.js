import { query } from "@/lib/db";


export async function GET(request,{params}) {
    const id = params.id;
    const programs = await query({
        query: "SELECT * FROM program where id = ?",
        values: [id],
    });


    let data = JSON.stringify(programs);
    return new Response(data, {
        status: 200,
    });
}
export async function PUT(request,{params}) {
    const id = params.id;
    const { pgm_name } = await request.json();
    const updateprograms = await query({
        query: "UPDATE program SET pgm_name = ? WHERE id = ?",
        values: [pgm_name,  id],
    });


    const result = updateprograms.affectedRows;
    let message = result ? "success" : "error";


    const program = {
        id: id,
        pgm_name: pgm_name,
    };


    return new Response(JSON.stringify({
        message: message,
        status: 200,
        program: program
    }), { headers: { 'Content-Type': 'application/json' } });


}


export async function DELETE(request,{params}) {
    const id = params.id;
    const deleteprogram = await query({
        query: "DELETE FROM program WHERE id = ?",
        values: [id],
    });
    const result = deleteprogram.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const program = {
        id: id,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        program: program
    }));


}
