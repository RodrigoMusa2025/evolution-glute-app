// /api/create_preference.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const url = 'https://api.mercadopago.com/preapproval';

    const body = {
        // ¡Este es el NUEVO ID de Plan de PRUEBA!
        preapproval_plan_id: 'adabf5996b244b6aa181e7df9447f', 
        reason: 'Suscripción Mensual a Evolution Gym',
        back_urls: {
            success: 'https://nueva-gules.vercel.app/',
            failure: 'https://nueva-gules.vercel.app/',
            pending: 'https://nueva-gules.vercel.app/'
        },
        auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
        }
    };

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error de Mercado Pago:', errorData);
            return res.status(response.status).json({ error: 'Error al crear la preferencia' });
        }
        
        const data = await response.json();
        res.status(200).json({ id: data.id });

    } catch (error) {
        console.error('Error interno:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}