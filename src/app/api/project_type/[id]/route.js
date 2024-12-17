import { query } from "@/lib/db";


export async function GET(request,{params}) {
    const id = params.id;
    const titles = await query({
        query: "SELECT * FROM project_type where id = ?",
        values: [id],
    });


    let data = JSON.stringify(titles);
    return new Response(data, {
        status: 200,
    });
}
export async function PUT(request,{params}) {
    const id = params.id;
    const { pjt_name } = await request.json();
    const updateTitles = await query({
        query: "UPDATE project_type SET pjt_name = ? WHERE id = ?",
        values: [pjt_name,  id],
    });


    const result = updateTitles.affectedRows;
    let message = result ? "success" : "error";


    const project_type = {
        id: id,
        pjt_name: pjt_name,
    };


    return new Response(JSON.stringify({
        message: message,
        status: 200,
        project_type: project_type
    }), { headers: { 'Content-Type': 'application/json' } });


}


export async function DELETE(request,{params}) {
    const id = params.id;
    const deleteTitle = await query({
        query: "DELETE FROM project_type WHERE id = ?",
        values: [id],
    });
    const result = deleteTitle.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const project_type = {
        id: id,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        project_type: project_type
    }));


}
