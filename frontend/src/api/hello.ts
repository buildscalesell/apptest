export async function fetchHello() {
    const res = await fetch("http://localhost:8000/api/hello");
    const data = await res.json();
    return data.message;
  }

  