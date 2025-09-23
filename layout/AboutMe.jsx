import Section from '../components/Section'

const AboutMe = () => {
  return (
    <Section>
      <h2 className="topic-text">About me</h2>
      <p className="liquid-glass leading-relaxed text-lg indent-16 py-4 px-8 max-w-[80vw]">
        I’m a frontend developer specializing in <b>React</b>, <b>Express</b>,{' '}
        <b>TypeScript</b>, and <b>Tailwind</b>. I studied civil engineering
        (B.Eng.) and pivoted into software field after consistently building
        small apps and web tools during university. I value readable code,
        accessible UI, and fast feedback loops. Currently working on a real-time
        chat demo (Express + socket.io). Open to junior
        frontend/backend/fullstack roles — <b>Bangkok/remote</b>.
      </p>
    </Section>
  )
}
export default AboutMe
