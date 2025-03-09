import axios from 'axios';

export async function getObjects() {
    const res = await axios.get('/api/objects');
    return res.data;
}
