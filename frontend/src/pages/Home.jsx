import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { useUsuarios } from '../hooks/useUsuarios';
import './Home.css';

const Home = () => {
  const { usuarios } = useUsuarios();
  const canvasRef = useRef(null);

  // Efecto de partículas con JavaScript Vanilla
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1.5;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.5 - 0.75;
        this.color = 'rgba(29, 78, 216, 0.4)';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const features = [
    { icon: Users, title: 'Gestión Centralizada', desc: 'Administra todos tus usuarios desde un solo lugar de forma eficiente.' },
    { icon: ShieldCheck, title: 'Seguridad Robusta', desc: 'Implementación de mejores prácticas para la integridad de los datos.' },
    { icon: Zap, title: 'Alta Performance', desc: 'Operaciones rápidas y fluidas gracias a una arquitectura optimizada.' },
    { icon: BarChart3, title: 'Estadísticas Reales', desc: 'Visualiza el crecimiento y estado de tu base de usuarios al instante.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="home">
      <canvas ref={canvasRef} className="home__particles" />
      
      <section className="home__hero">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="home__title"
        >
          Bienvenido al Sistema de Gestión
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="home__subtitle"
        >
          Una solución moderna y escalable para la administración de usuarios.
        </motion.p>
      </section>

      <motion.div 
        className="home__stats"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="stat-card" variants={itemVariants}>
          <span className="stat-card__number">{usuarios.length}</span>
          <span className="stat-card__label">Usuarios Totales</span>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants}>
          <span className="stat-card__number">{usuarios.filter(u => u.id % 2 === 0).length}</span>
          <span className="stat-card__label">Usuarios Activos</span>
        </motion.div>
        <motion.div className="stat-card" variants={itemVariants}>
          <span className="stat-card__number">100%</span>
          <span className="stat-card__label">Disponibilidad</span>
        </motion.div>
      </motion.div>

      <section className="home__features">
        <h2 className="home__section-title">Características Principales</h2>
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="feature-card__icon" size={40} />
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
