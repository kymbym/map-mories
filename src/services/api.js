const key = `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`;

export const deleteMarker = async (id) => {
  const url = `${import.meta.env.VITE_AIRTABLE_DELETE_URL}${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }
  } catch (error) {
    console.error("error deleting marker:", error.message);
  }
};

export const updateMarker = async (id, updatedData) => {
  const url = `${import.meta.env.VITE_AIRTABLE_PUT_URL}${id}`;

  const payload = {
    fields: {
      date: updatedData.date,
      lat: updatedData.lat,
      lng: updatedData.lng,
      title: updatedData.title,
      description: updatedData.description,
    },
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    return { id: json.id, ...json.fields };
  } catch (error) {
    console.error("error updating marker:", error.message);
  }
};

export async function fetchMarkers() {
  const url = import.meta.env.VITE_AIRTABLE_GET_URL;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log("airtable", json);

    const positions = json.records.map((marker) => ({
      id: marker.id,
      lat: marker.fields.lat,
      lng: marker.fields.lng,
      date: marker.fields.date,
      title: marker.fields.title,
      description: marker.fields.description,
      image: marker.fields.image,
    }));

    console.log("marker positions", positions);
    return positions;
  } catch (error) {
    console.error(error.message);
  }
}

export const createMarker = async (formData) => {
  const url = import.meta.env.VITE_AIRTABLE_POST_URL;
  
  const payload = {
    fields: {
      lat: Number(formData.lat),
      lng: Number(formData.lng),
      date: formData.date,
      title: formData.title,
      description: formData.description,
      image: formData.image,
    },
  };
  console.log("payload", JSON.stringify(payload));

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: key,
      },
    });

    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }

    const json = await response.json();
    return { id: json.id, ...json.fields };
  } catch (error) {
    console.error("error creating marker", error.message);
    console.log(response.json());
  }
};