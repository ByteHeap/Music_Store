import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface TrackData { name: string; duration: string; }
interface TrackGroup { groupName: string; tracks: TrackData[]; }

interface ProductAdmin {
    id: number;
    name: string;
    price: number;
    currency: string;
    image: string;
    category: string;
    brand: string;
    manufacturer: string;
    codCategorie: number;
    codArtist: number;
    codBrand: number;
    description: string;
    specs: Record<string, unknown>;
    gallery?: string[];
}
interface ArtistAdmin { id: number; name: string; country: string; startYear: number; }
interface BrandAdmin { id: number; name: string; }
interface CategoryAdmin { id: number; name: string; }
interface UserAdmin { id: number; name: string; email: string; role: 'user' | 'admin'; }

interface OrderItemAdmin { productId: number; name: string; quantity: number; price: string | number; image: string; }
interface OrderAdmin { id: number; date: string; status: 'Noua' | 'Procesata' | 'Livrata' | 'Anulata'; total: string | number; items: OrderItemAdmin[]; }

type AdminTab = 'products' | 'brands' | 'artists' | 'users';

export default function AdminDashboard() {
    const { user, isAdmin, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<AdminTab>('products');

    const [products, setProducts] = useState<ProductAdmin[]>([]);
    const [artists, setArtists] = useState<ArtistAdmin[]>([]);
    const [brands, setBrands] = useState<BrandAdmin[]>([]);
    const [categories, setCategories] = useState<CategoryAdmin[]>([]);
    const [usersList, setUsersList] = useState<UserAdmin[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodImage, setProdImage] = useState('');
    const [prodGallery, setProdGallery] = useState<string[]>([]);
    const [prodCategory, setProdCategory] = useState('');
    const [prodBrand, setProdBrand] = useState('');
    const [prodManufacturer, setProdManufacturer] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [prodSpecs, setProdSpecs] = useState<{ key: string; value: string }[]>([]);

    const [hasTracklist, setHasTracklist] = useState(false);
    const [tracklist, setTracklist] = useState<TrackGroup[]>([]);

    const [brandName, setBrandName] = useState('');
    const [artName, setArtName] = useState('');
    const [artCountry, setArtCountry] = useState('');
    const [artYear, setArtYear] = useState('');
    const [usrName, setUsrName] = useState('');
    const [usrEmail, setUsrEmail] = useState('');
    const [usrRole, setUsrRole] = useState<'user' | 'admin'>('user');

    const [viewingOrdersUser, setViewingOrdersUser] = useState<UserAdmin | null>(null);
    const [userOrders, setUserOrders] = useState<OrderAdmin[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    const loadData = async () => {
        try {
            const pRes = await fetch('http://localhost:5001/api/products');
            const pData = await pRes.json();
            const aRes = await fetch('http://localhost:5001/api/artists');
            const aData = await aRes.json();
            const bRes = await fetch('http://localhost:5001/api/brands');
            const bData = await bRes.json();
            const cRes = await fetch('http://localhost:5001/api/categories');
            const cData = await cRes.json();
            const uRes = await fetch('http://localhost:5001/api/users');
            const uData = await uRes.json();

            setProducts(pData);

            setArtists(aData);

            setBrands(bData);

            setCategories(cData);

            setUsersList(uData);

            if (cData.length > 0) {
                setProdCategory(cData[0].id.toString());
            }
        } catch (err) {
            console.error(err);
        }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { if (isAdmin) loadData(); }, [isAdmin]);

    if (!isAdmin) return <Navigate to="/login" replace />;

    const openAddModal = () => {
        setEditingId(null); setIsFormOpen(true);
        setProdName(''); setProdPrice(''); setProdImage(''); setProdDescription('');
        setProdGallery([]);
        setProdBrand(''); setProdManufacturer('');
        setProdSpecs([]);
        setHasTracklist(false); setTracklist([]);
        setBrandName(''); setArtName(''); setArtCountry(''); setArtYear('');
    };

    const handleEditProductClick = (p: ProductAdmin) => {
        setEditingId(p.id); setProdName(p.name); setProdPrice(p.price.toString()); setProdImage(p.image);
        setProdCategory(p.codCategorie?.toString() || '1');
        setProdBrand(p.codArtist?.toString() || '');
        setProdManufacturer(p.codBrand?.toString() || '');
        setProdDescription(p.description);
        setProdGallery(p.gallery || []);

        const specsObj = { ...(p.specs || {}) };
        const loadedTracklist = specsObj.TracklistData as TrackGroup[] | undefined;
        delete specsObj.TracklistData;

        setProdSpecs(Object.entries(specsObj).map(([key, value]) => ({ key, value: String(value) })));

        if (loadedTracklist && Array.isArray(loadedTracklist) && loadedTracklist.length > 0) {
            setHasTracklist(true);
            setTracklist(loadedTracklist);
        } else {
            setHasTracklist(false);
            setTracklist([]);
        }

        setIsFormOpen(true);
    };

    const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => { const newSpecs = [...prodSpecs]; newSpecs[index][field] = val; setProdSpecs(newSpecs); };
    const addSpecRow = () => setProdSpecs([...prodSpecs, { key: '', value: '' }]);
    const removeSpecRow = (index: number) => setProdSpecs(prodSpecs.filter((_, i) => i !== index));

    const addTrackGroup = () => setTracklist([...tracklist, { groupName: 'Side A', tracks: [] }]);
    const removeTrackGroup = (gIndex: number) => setTracklist(tracklist.filter((_, i) => i !== gIndex));
    const updateGroupName = (gIndex: number, val: string) => { const n = [...tracklist]; n[gIndex].groupName = val; setTracklist(n); };
    const addTrack = (gIndex: number) => { const n = [...tracklist]; n[gIndex].tracks.push({ name: '', duration: '' }); setTracklist(n); };
    const removeTrack = (gIndex: number, tIndex: number) => { const n = [...tracklist]; n[gIndex].tracks.splice(tIndex, 1); setTracklist(n); };
    const updateTrack = (gIndex: number, tIndex: number, field: 'name'|'duration', val: string) => { const n = [...tracklist]; n[gIndex].tracks[tIndex][field] = val; setTracklist(n); };

    const handleEditArtistClick = (a: ArtistAdmin) => { setEditingId(a.id); setArtName(a.name); setArtCountry(a.country); setArtYear(a.startYear.toString()); setIsFormOpen(true); };
    const handleEditBrandClick = (b: BrandAdmin) => { setEditingId(b.id); setBrandName(b.name); setIsFormOpen(true); };
    const handleEditUserClick = (u: UserAdmin) => { setEditingId(u.id); setUsrName(u.name); setUsrEmail(u.email); setUsrRole(u.role); setIsFormOpen(true); };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let url = '', method = editingId ? 'PUT' : 'POST', payload = {};

        if (activeTab === 'products') {
            url = editingId ? `http://localhost:5001/api/products/${editingId}` : 'http://localhost:5001/api/products';

            const finalSpecsObject: Record<string, string | TrackGroup[]> = prodSpecs.reduce((acc, curr) => {
                if (curr.key.trim() && curr.value.trim()) acc[curr.key.trim()] = curr.value.trim();
                return acc;
            }, {} as Record<string, string | TrackGroup[]>);

            if (hasTracklist && tracklist.length > 0) {
                finalSpecsObject.TracklistData = tracklist;
            }

            payload = {
                name: prodName, price: parseFloat(prodPrice), image: prodImage,
                codCategorie: parseInt(prodCategory), codArtist: prodBrand ? parseInt(prodBrand) : null, codBrand: prodManufacturer ? parseInt(prodManufacturer) : null,
                description: prodDescription,
                specs: finalSpecsObject,
                gallery: prodGallery.filter(url => url.trim() !== '')
            };
        } else if (activeTab === 'artists') {
            url = editingId ? `http://localhost:5001/api/artists/${editingId}` : 'http://localhost:5001/api/artists';
            payload = { name: artName, country: artCountry, startYear: parseInt(artYear) || 0 };
        } else if (activeTab === 'brands') {
            url = editingId ? `http://localhost:5001/api/brands/${editingId}` : 'http://localhost:5001/api/brands';
            payload = { name: brandName };
        } else if (activeTab === 'users') {
            url = `http://localhost:5001/api/users/${editingId}`; method = 'PUT';
            payload = { name: usrName, email: usrEmail, role: usrRole };
        }

        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) { setIsFormOpen(false); loadData(); }
    };

    const handleDelete = async (type: string, id: number) => {
        if (!window.confirm("Sigur dorești eliminarea definitivă?")) return;
        const res = await fetch(`http://localhost:5001/api/${type}/${id}`, { method: 'DELETE' });
        if (res.ok) loadData();
    };

    const handleOpenOrdersModal = async (u: UserAdmin) => {
        setViewingOrdersUser(u);
        setOrdersLoading(true);
        try {
            const res = await fetch(`http://localhost:5001/api/users/${u.id}/orders`);
            if (res.ok) setUserOrders(await res.json());
        } catch (err) { console.error(err); } finally { setOrdersLoading(false); }
    };

    const handleLocalOrderStatusChange = (orderId: number, newStatus: OrderAdmin['status']) => {
        setUserOrders(orders => orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const handleLocalOrderItemChange = (orderId: number, productId: number, field: 'quantity' | 'price', val: string) => {
        const numVal = parseFloat(val) || 0;
        setUserOrders(orders => orders.map(o => {
            if (o.id !== orderId) return o;
            return {
                ...o,
                items: o.items.map(item => item.productId === productId ? { ...item, [field]: numVal } : item)
            };
        }));
    };

    const handleSaveOrder = async (orderId: number) => {
        const orderToSave = userOrders.find(o => o.id === orderId);
        if (!orderToSave) return;

        try {
            const res = await fetch(`http://localhost:5001/api/admin/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: orderToSave.status,
                    items: orderToSave.items
                })
            });

            const data = await res.json();
            if (data.success) {
                alert('Comanda a fost actualizată cu succes!');
                if (viewingOrdersUser) handleOpenOrdersModal(viewingOrdersUser);
            } else {
                alert('Eroare: ' + data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Eroare de conexiune.');
        }
    };


    return (
        <div className="container mx-auto px-4 py-12 text-gray-900 dark:text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-200 dark:border-gray-800 pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight uppercase">Admin Control Panel</h1>
                    <p className="text-sm text-gray-500 mt-1">Sesiune activă: <span className="font-semibold text-blue-500">{user?.numeComplet}</span></p>
                </div>
                <div className="flex gap-4">
                    {activeTab !== 'users' && (
                        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md">
                            + Adaugă Câmp Nou
                        </button>
                    )}
                    <button onClick={logout} className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-5 py-2.5 rounded-full text-sm font-semibold text-red-500 hover:bg-red-500/10">
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl max-w-md mb-8">
                {(['products', 'brands', 'artists', 'users'] as AdminTab[]).map(tab => (
                    <button key={tab} onClick={() => { setActiveTab(tab); setIsFormOpen(false); }} className={`w-1/4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-800 text-blue-500 shadow-sm' : 'text-gray-500'}`}>
                        {tab === 'products' ? 'Produse' : tab === 'brands' ? 'Branduri' : tab === 'artists' ? 'Artiști' : 'Useri'}
                    </button>
                ))}
            </div>

            {isFormOpen && (
                <div className="mb-10 p-6 bg-gray-50 dark:bg-[#0e0e0e] border border-gray-200 dark:border-gray-800 rounded-2xl animate-fade-in">
                    <form onSubmit={handleFormSubmit}>
                        {activeTab === 'products' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Nume Produs</label><input type="text" required value={prodName} onChange={e => setProdName(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
                                <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Preț (RON)</label><input type="number" required value={prodPrice} onChange={e => setProdPrice(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
                                <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-gray-500 mb-2">URL Imagine</label><input type="text" required value={prodImage} onChange={e => setProdImage(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
                                    <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Categorie</label><select value={prodCategory} onChange={e => setProdCategory(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500">{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                                    <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Artist Corespondent</label><select value={prodBrand} onChange={e => setProdBrand(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500"><option value="">Fără Artist (N/A)</option>{artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
                                    <div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Brand / Producător</label><select value={prodManufacturer} onChange={e => setProdManufacturer(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500"><option value="">Fără Brand Producător</option>{brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
                                </div>

                                {/* GALERIE FOTO */}
                                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="block text-xs font-bold uppercase text-gray-500">Galerie Foto (Imagini Secundare)</label>
                                        <button type="button" onClick={() => setProdGallery([...prodGallery, ''])} className="text-blue-500 hover:text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors">+ Adaugă Imagine</button>
                                    </div>
                                    <div className="space-y-3">
                                        {prodGallery.map((img, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="URL Imagine secundară (ex: https://...)"
                                                    value={img}
                                                    onChange={e => { const newG = [...prodGallery]; newG[index] = e.target.value; setProdGallery(newG); }}
                                                    className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                {img && <div className="w-10 h-10 bg-white border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center p-0.5"><img src={img} alt="" className="max-w-full max-h-full object-contain" /></div>}
                                                <button type="button" onClick={() => setProdGallery(prodGallery.filter((_, i) => i !== index))} className="text-gray-400 hover:text-red-500 font-bold px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* TRACKLIST */}
                                <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-5 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <input type="checkbox" id="hasTracklist" checked={hasTracklist} onChange={(e) => setHasTracklist(e.target.checked)} className="w-5 h-5 rounded accent-blue-600 cursor-pointer" />
                                        <label htmlFor="hasTracklist" className="font-bold text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider cursor-pointer">Adaugă Listă Piese (Muzică)</label>
                                    </div>

                                    {hasTracklist && (
                                        <div className="space-y-6 mt-6">
                                            {tracklist.map((group, gIndex) => (
                                                <div key={gIndex} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-sm">
                                                    <div className="flex justify-between gap-4 mb-4">
                                                        <input type="text" placeholder="Ex: Side A, CD 1" value={group.groupName} onChange={e => updateGroupName(gIndex, e.target.value)} className="font-bold text-lg outline-none bg-transparent border-b border-gray-200 dark:border-gray-800 focus:border-blue-500 pb-1 flex-1 text-gray-900 dark:text-white" />
                                                        <button type="button" onClick={() => removeTrackGroup(gIndex)} className="text-red-500 text-xs font-bold uppercase hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1 rounded-lg transition-colors">Șterge Grup</button>
                                                    </div>

                                                    <div className="space-y-2 mb-4">
                                                        {group.tracks.map((track, tIndex) => (
                                                            <div key={tIndex} className="flex gap-2 items-center">
                                                                <input type="text" placeholder="Nume (ex: 1a. Speak To Me)" value={track.name} onChange={e => updateTrack(gIndex, tIndex, 'name', e.target.value)} className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                                                                <input type="text" placeholder="1:30" value={track.duration} onChange={e => updateTrack(gIndex, tIndex, 'duration', e.target.value)} className="w-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-center" />
                                                                <button type="button" onClick={() => removeTrack(gIndex, tIndex)} className="text-gray-400 hover:text-red-500 font-bold px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">X</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button type="button" onClick={() => addTrack(gIndex)} className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 px-4 py-2 rounded-lg transition-colors">+ Adaugă Piesă</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={addTrackGroup} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 font-bold text-sm uppercase rounded-xl hover:border-blue-500 hover:text-blue-500 transition-colors bg-white dark:bg-transparent">+ Adaugă Grup Nou (Side/CD)</button>
                                        </div>
                                    )}
                                </div>

                                {/* SPECIFICAȚIONS */}
                                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="block text-xs font-bold uppercase text-gray-500">Specificații Tehnice (Opțional)</label>
                                        <button type="button" onClick={addSpecRow} className="text-blue-500 hover:text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors">+ Adaugă Linie</button>
                                    </div>
                                    <div className="space-y-3">
                                        {prodSpecs.map((spec, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <input type="text" placeholder="Ex: Culoare" value={spec.key} onChange={e => handleSpecChange(index, 'key', e.target.value)} className="w-1/3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                                                <span className="text-gray-400 font-bold">:</span>
                                                <input type="text" placeholder="Ex: Negru" value={spec.value} onChange={e => handleSpecChange(index, 'value', e.target.value)} className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                                                <button type="button" onClick={() => removeSpecRow(index)} className="text-gray-400 hover:text-red-500 font-bold px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2"><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Descriere Produs</label><textarea rows={4} value={prodDescription} onChange={e => setProdDescription(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500" /></div>
                            </div>
                        )}

                        {activeTab === 'brands' && (<div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Denumire Producător / Brand</label><input type="text" required value={brandName} onChange={e => setBrandName(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none" placeholder="Yamaha, Fender, Gibson, etc." /></div>)}
                        {activeTab === 'artists' && (<div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Nume Trupa / Artist</label><input type="text" required value={artName} onChange={e => setArtName(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none" /></div><div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Țară de Origine</label><input type="text" required value={artCountry} onChange={e => setArtCountry(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none" /></div><div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">An Înființare</label><input type="number" required value={artYear} onChange={e => setArtYear(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none" /></div></div>)}
                        {activeTab === 'users' && (<div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Nume</label><input type="text" required value={usrName} onChange={e => setUsrName(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none" /></div><div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email</label><input type="email" required value={usrEmail} onChange={e => setUsrEmail(e.target.value)} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none" /></div><div><label className="block text-xs font-bold uppercase text-gray-500 mb-2">Permisiuni Rol</label><select value={usrRole} onChange={e => setUsrRole(e.target.value as 'user' | 'admin')} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 text-sm rounded-xl outline-none"><option value="user">User Standard</option><option value="admin">Admin Panel Root</option></select></div></div>)}

                        <div className="flex gap-4 justify-end mt-8 border-t border-gray-200 dark:border-gray-800 pt-6">
                            <button type="button" onClick={() => setIsFormOpen(false)} className="text-sm font-medium text-gray-500">Anulează</button>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors shadow-md">{editingId ? 'Salvează Modificările' : 'Creează Înregistrarea'}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    {activeTab === 'products' && (
                        <table className="w-full text-left text-sm border-collapse">
                            <thead><tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 text-xs font-bold uppercase bg-gray-50 dark:bg-[#111]"><th className="p-4">Foto</th><th className="p-4">Nume Produs</th><th className="p-4">Brand</th><th className="p-4">Artist</th><th className="p-4">Preț</th><th className="p-4 text-right">Acțiuni</th></tr></thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {products.map(p => (
                                <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-all">
                                    <td className="p-4"><div className="w-12 h-12 bg-white rounded-lg border border-gray-100 dark:border-gray-800 flex items-center justify-center p-1"><img src={p.image} alt="" className="max-w-full max-h-full object-contain" /></div></td>
                                    <td className="p-4 font-semibold">{p.name}</td><td className="p-4 text-blue-500 font-medium">{p.manufacturer}</td><td className="p-4 text-gray-500">{p.brand}</td><td className="p-4 font-bold">{p.price.toLocaleString()} RON</td>
                                    <td className="p-4 text-right"><button onClick={() => handleEditProductClick(p)} className="text-blue-500 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg text-xs font-medium">Modifică</button><button onClick={() => handleDelete('products', p.id)} className="text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-xs font-medium">Șterge</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                    {activeTab === 'brands' && (<table className="w-full text-left text-sm border-collapse"><thead><tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 text-xs font-bold uppercase bg-gray-50 dark:bg-[#111]"><th className="p-4">ID</th><th className="p-4">Nume Brand</th><th className="p-4 text-right">Acțiuni</th></tr></thead><tbody className="divide-y divide-gray-100 dark:divide-gray-800">{brands.map(b => (<tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20"><td className="p-4 font-mono text-gray-400 text-xs">#{b.id}</td><td className="p-4 font-semibold text-blue-500">{b.name}</td><td className="p-4 text-right"><button onClick={() => handleEditBrandClick(b)} className="text-blue-500 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg text-xs font-medium">Modifică</button><button onClick={() => handleDelete('brands', b.id)} className="text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-xs font-medium">Șterge</button></td></tr>))}</tbody></table>)}
                    {activeTab === 'artists' && (<table className="w-full text-left text-sm border-collapse"><thead><tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 text-xs font-bold uppercase bg-gray-50 dark:bg-[#111]"><th className="p-4">ID</th><th className="p-4">Nume Artist</th><th className="p-4">Țară</th><th className="p-4">An</th><th className="p-4 text-right">Acțiuni</th></tr></thead><tbody className="divide-y divide-gray-100 dark:divide-gray-800">{artists.map(a => (<tr key={a.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20"><td className="p-4 font-mono text-gray-400 text-xs">#{a.id}</td><td className="p-4 font-semibold">{a.name}</td><td className="p-4 text-gray-600 dark:text-gray-300">{a.country}</td><td className="p-4 font-medium">{a.startYear}</td><td className="p-4 text-right"><button onClick={() => handleEditArtistClick(a)} className="text-blue-500 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg text-xs font-medium">Modifică</button><button onClick={() => handleDelete('artists', a.id)} className="text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-xs font-medium">Șterge</button></td></tr>))}</tbody></table>)}

                    {activeTab === 'users' && (
                        <table className="w-full text-left text-sm border-collapse">
                            <thead><tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 text-xs font-bold uppercase bg-gray-50 dark:bg-[#111]"><th className="p-4">ID</th><th className="p-4">Nume</th><th className="p-4">Email</th><th className="p-4">Rol</th><th className="p-4 text-right">Acțiuni</th></tr></thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {usersList.map(u => (
                                <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20">
                                    <td className="p-4 font-mono text-gray-400 text-xs">#{u.id}</td>
                                    <td className="p-4 font-semibold">{u.name}</td>
                                    <td className="p-4 text-gray-500">{u.email}</td>
                                    <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>{u.role.toUpperCase()}</span></td>
                                    <td className="p-4 text-right flex gap-2 justify-end">
                                        <button onClick={() => handleOpenOrdersModal(u)} className="text-purple-500 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                            Comenzi
                                        </button>
                                        <button onClick={() => handleEditUserClick(u)} className="text-blue-500 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Editează Rol</button>
                                        <button onClick={() => handleDelete('users', u.id)} className="text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors" disabled={user?.id === u.id}>Șterge</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {viewingOrdersUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-gray-800 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">

                        {/* Header Modal */}
                        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#141416]">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Panou Comenzi</h2>
                                <p className="text-sm text-gray-500 mt-1">Client: <span className="font-semibold text-blue-500">{viewingOrdersUser.name}</span> <span className="opacity-70">({viewingOrdersUser.email})</span></p>
                            </div>
                            <button onClick={() => setViewingOrdersUser(null)} className="text-gray-400 hover:text-white p-2.5 bg-white dark:bg-black rounded-full transition-colors border border-gray-200 dark:border-gray-800 hover:border-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar bg-white dark:bg-[#0e0e10]">
                            {ordersLoading ? (
                                <div className="text-center py-10 text-gray-500">Se încarcă comenzile...</div>
                            ) : userOrders.length === 0 ? (
                                <div className="text-center py-10 text-gray-500 text-lg">Acest utilizator nu are nicio comandă plasată.</div>
                            ) : (
                                <div className="space-y-10">
                                    {userOrders.map(order => (
                                        <div key={order.id} className="bg-gray-50 dark:bg-[#161618] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">

                                            {/* Order Bar - Status & Total */}
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                                                <div>
                                                    <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest block mb-1">Comanda #{order.id}</span>
                                                    <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">{new Date(order.date).toLocaleString('ro-RO')}</span>
                                                </div>
                                                <div className="flex items-center gap-6 w-full md:w-auto">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleLocalOrderStatusChange(order.id, e.target.value as OrderAdmin['status'])}
                                                        className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm rounded-xl font-bold px-4 py-2.5 outline-none focus:border-blue-500 cursor-pointer flex-1 md:flex-none shadow-sm"
                                                    >
                                                        <option value="Noua">Nouă</option>
                                                        <option value="Procesata">Procesată</option>
                                                        <option value="Livrata">Livrată</option>
                                                        <option value="Anulata">Anulată</option>
                                                    </select>
                                                    <div className="text-right">
                                                        <div className="text-[11px] text-gray-500 uppercase font-extrabold tracking-wider mb-1">Total Calculat</div>
                                                        <div className="text-xl font-black text-blue-600 dark:text-[#4da3ff]">{Number(order.total).toLocaleString()} RON</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Container*/}
                                            <div className="bg-white dark:bg-[#0e0e10] rounded-2xl border border-gray-100 dark:border-gray-800/80 p-2 space-y-1 mb-6">
                                                {order.items.map(item => (
                                                    <div key={item.productId} className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#131315] transition-colors">
                                                        <div className="w-14 h-14 bg-gray-100 dark:bg-black rounded-xl p-2 flex-shrink-0 flex justify-center items-center shadow-sm border border-gray-100 dark:border-gray-800/50">
                                                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                                        </div>
                                                        <div className="flex-grow text-center sm:text-left">
                                                            <span className="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-1">{item.name}</span>
                                                            <span className="text-xs text-gray-500 font-medium mt-0.5 block">ID Produs: {item.productId}</span>
                                                        </div>

                                                        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-4 mt-2 sm:mt-0">

                                                            {/* Quantity Selector*/}
                                                            <div className="flex flex-col items-center">
                                                                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Cantitate</label>
                                                                <div className="flex items-center bg-gray-100 dark:bg-[#111] rounded-full p-1 border border-gray-200 dark:border-gray-800">
                                                                    <button
                                                                        onClick={() => {
                                                                            if (item.quantity > 1) {
                                                                                handleLocalOrderItemChange(order.id, item.productId, 'quantity', String(item.quantity - 1));
                                                                            }
                                                                        }}
                                                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                                                    </button>

                                                                    <span className="w-6 text-center font-bold text-gray-900 dark:text-white text-sm">
                                                                        {item.quantity}
                                                                    </span>

                                                                    <button
                                                                        onClick={() => handleLocalOrderItemChange(order.id, item.productId, 'quantity', String(item.quantity + 1))}
                                                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col items-center">
                                                                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Preț Vanzare</label>
                                                                <div className="flex items-center shadow-sm rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 overflow-hidden">
                                                                    <input
                                                                        type="text"
                                                                        min="0"
                                                                        value={item.price}
                                                                        onChange={(e) => handleLocalOrderItemChange(order.id, item.productId, 'price', e.target.value)}
                                                                        className="w-20 bg-transparent py-1.5 px-3 text-sm text-center font-bold text-gray-900 dark:text-white outline-none"
                                                                    />
                                                                    <span className="bg-gray-50 dark:bg-[#111] border-l border-gray-200 dark:border-gray-800 px-3 py-1.5 text-sm text-gray-500 font-bold">RON</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Save Button */}
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleSaveOrder(order.id)}
                                                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20"
                                                >
                                                    Salvează Modificările Comenzii
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}