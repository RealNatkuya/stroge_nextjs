import { query } from "@/lib/db";


export async function GET(request,{params}) {
    const id = params.id;
    const titles = await query({
        query: "SELECT * FROM title where id = ?",
        values: [id],
    });


    let data = JSON.stringify(titles);
    return new Response(data, {
        status: 200,
    });
}
export async function PUT(request,{params}) {
    const id = params.id;
    const { ttl_name } = await request.json();
    const updateTitles = await query({
        query: "UPDATE title SET ttl_name = ? WHERE id = ?",
        values: [ttl_name,  id],
    });


    const result = updateTitles.affectedRows;
    let message = result ? "success" : "error";


    const title = {
        id: id,
        ttl_name: ttl_name,
    };


    return new Response(JSON.stringify({
        message: message,
        status: 200,
        title: title
    }), { headers: { 'Content-Type': 'application/json' } });


}


export async function DELETE(request,{params}) {
    const id = params.id;
    const deleteTitle = await query({
        query: "DELETE FROM title WHERE id = ?",
        values: [id],
    });
    const result = deleteTitle.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const title = {
        id: id,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        title: title
    }));


}
