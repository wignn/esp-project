import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const response = await fetch('https://graph.facebook.com/v22.0/627770013747980/messages', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer EAAjMPSOZAwfoBOZB1KZBWRlLUfPDFnX8q8rnNKoJxvZChJe3lJjJktQvegxY8PqbRtOtJph7qROgo8mC5h8y1YOKd39I56TWkRKGVMYr3msg8f4gZBsESexfbbcZCYhkxekuht23VEnBVGdzYrSvApNzrgwZBh9laATcn7EtLd4ykZCX17dAiL4RYevyspBRCZCYcjiN3NSTy91xxosdR3ZCn8APN8NcU2',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: '6282246291956',
                type: 'template',
                template: {
                    name: 'hello_world',
                    language: { code: 'en_US' }
                }
            })
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}