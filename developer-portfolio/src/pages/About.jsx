import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';

const About = () => {
  const experiences = [
    {
      id: 1,
      date: '2022 - Present',
      company: 'Tech Innovations Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      description:
        'Leading the development of enterprise-level web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions.',
      techStack: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'TypeScript'],
    },
    {
      id: 2,
      date: '2020 - 2022',
      company: 'Digital Solutions Co.',
      position: 'Full Stack Developer',
      location: 'New York, NY',
      description:
        'Developed and maintained multiple client-facing web applications. Collaborated with design teams to implement responsive, accessible interfaces. Optimized application performance and implemented CI/CD pipelines.',
      techStack: ['React', 'Express.js', 'MongoDB', 'Redis', 'Git', 'Jest'],
    },
    {
      id: 3,
      date: '2018 - 2020',
      company: 'StartUp Ventures',
      position: 'Frontend Developer',
      location: 'Austin, TX',
      description:
        'Built interactive user interfaces for SaaS products. Implemented state management solutions and worked closely with backend teams to integrate APIs. Contributed to the development of the company\'s component library.',
      techStack: ['React', 'Redux', 'JavaScript', 'CSS3', 'HTML5', 'Webpack'],
    },
    {
      id: 4,
      date: '2017 - 2018',
      company: 'Creative Agency',
      position: 'Junior Web Developer',
      location: 'Chicago, IL',
      description:
        'Developed websites for various clients across different industries. Gained experience in frontend technologies and basic backend development. Participated in code reviews and agile ceremonies.',
      techStack: ['JavaScript', 'jQuery', 'PHP', 'MySQL', 'WordPress', 'Bootstrap'],
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h1>
            <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20working%20on%20laptop%20modern%20office&image_size=landscape_4_3"
                alt="Developer at work"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Full Stack Developer with a Passion for Innovation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                With over 6 years of experience in web development, I've had the privilege of
                working with startups, agencies, and enterprise companies to build exceptional
                digital experiences. My journey started with a curiosity about how the web works,
                and it has evolved into a passion for creating elegant, efficient, and
                user-friendly solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                I specialize in the React ecosystem, but I'm always eager to learn new
                technologies and approaches. When I'm not coding, you can find me contributing to
                open-source projects, writing technical blog posts, or exploring the latest
                developments in web technologies.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <FiBriefcase size={20} />
                  <span className="font-medium">6+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <FiMapPin size={20} />
                  <span className="font-medium">Remote Friendly</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.position}
                    </h3>
                    <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
                      {exp.company}
                    </h4>
                  </div>
                  <div className="flex flex-col items-start md:items-end space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiCalendar size={18} />
                      <span>{exp.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiMapPin size={18} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Technologies Used
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
