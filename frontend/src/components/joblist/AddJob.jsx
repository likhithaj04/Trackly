import { useRef ,useState} from "react";
import api from '../../utils/api'


function AddJob() {
  const textareaRef = useRef(null);
    const [loading, setLoading] = useState(false);
  const [outreach, setOutreach] = useState("");

  const handleInput = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);

      const res = await api.post("/job/jobdata", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(res.data);
      setOutreach(res.data.outreachmsg);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-lavender2 px-4">
      
      <div className="w-full md:w-170 p-2 md:p-25 bg-rose2 rounded-xl shadow-lg border border-gray-300">
        
        <h2 className="text-xl font-semibold mb-6 text-center">
          Add Job Details
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          
          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="text-sm font-medium">
               Company Name
            </label>
            <input
              name="company"
              type="text"
              placeholder="Add company name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>
             <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-sm font-medium">
               Role
            </label>
            <input
              name="role"
              type="text"
              placeholder="Add role"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="summary" className="text-sm font-medium">
              Description
            </label>
            <textarea
              name="summary"
              ref={textareaRef}
              onInput={handleInput}
              rows={1}
              placeholder="Add job description..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="resume" className="text-sm font-medium">
              Upload Resume
            </label>
            <input
              name="resume"
              type="file"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer"
            />
          </div>
    <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded"
          >
            {loading ? "Generating..." : "Generate Outreach"}
          </button>
   {outreach && (
        <div className="w-full md:w-170 mt-6 p-4 bg-white border rounded shadow">
          <h3 className="font-semibold mb-2">Generated Outreach</h3>
          <p className="text-blue-700">{outreach}</p>
        </div>
      )}
        </form>
      </div>
    </div>
  );
}

export default AddJob;