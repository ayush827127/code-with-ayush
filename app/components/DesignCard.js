export default function DesignCard({ design }) {
    return (
      <div className="border p-4">
        <h3 className="font-bold mb-2">{design.title}</h3>
        <iframe
          srcDoc={`<html><head><style>${design.cssContent}</style></head><body>${design.htmlContent}<script>${design.jsContent}</script></body></html>`}
          sandbox="allow-scripts"
          className="w-full"
          style={{ minHeight: '300px' }} // Adjust this height as needed
        />
      </div>
    );
  }
  