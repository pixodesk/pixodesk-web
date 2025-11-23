import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function MainPage() {
    return <h2 className="">Main Page</h2>;
}

function PricingPage() {
    return <h2 className="">Pricing Page</h2>;
}

function DocsPage() {
    return <h2 className="">Docs Page</h2>;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <nav className="flex space-x-4 mb-4">
                <Link to="/" className="text-blue-500 hover:underline">Main</Link>
                <Link to="/pricing" className="text-blue-500 hover:underline">Pricing</Link>
                <Link to="/docs" className="text-blue-500 hover:underline">Docs</Link>
            </nav>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/docs" element={<DocsPage />} />
            </Routes>
        </BrowserRouter>
    );
}