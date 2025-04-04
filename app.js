const { useEffect, useState } = React;
const { motion } = window['framer-motion'];

const DataWhisperer = () => {
  const [contactNumber, setContactNumber] = useState("000-000-0000");
  const originalNumber = "123-456-7890";

  useEffect(() => {
    // Initialize 3D Globe with Neural Network
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("globe-container").appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00 });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document.getElementById("globe-container").removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setContactNumber(
        originalNumber
          .split("")
          .map((char, i) => (i <= index ? char : Math.floor(Math.random() * 10)))
          .join("")
      );
      if (index >= originalNumber.length) clearInterval(interval);
      index++;
    }, 100);
  }, []);

  return (
    <div className="container">
      <h1 className="title">The Data Whisperer</h1>
      <p className="bio">
        Most people see data as numbers. I see it as a language—a cryptic dialect spoken by the universe itself.
      </p>

      <div id="globe-container" className="globe"></div>

      <div className="contact">
        <h2>Contact</h2>
        <p>{contactNumber}</p>
      </div>

      <div className="question-section">
        <motion.div
          className="question-box"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Data Whisperer brings a challenge for you...</h3>
          <p>Which algorithm is best for anomaly detection in high-dimensional data?</p>
          <input type="text" placeholder="Your answer..." />
          <button>Submit</button>
        </motion.div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<DataWhisperer />);
