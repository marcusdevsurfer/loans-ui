import { Link } from 'wouter'

export const NotFound = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go to Home</Link>
        </div>
    )
}

