import Section from '@/components/Section'
import ContactDetail from '../components/ContactDetail'

const Contact = () => {
  return (
    <Section>
      <div className="flex gap-1 items-end">
        <h2 className="topic-text">Contacts </h2>
      </div>
      <div className="flex gap-20">
        <div className="text-lg lg:text-xl xl:text-2xl liquid-glass w-fit p-4">
          <p className="mb-2">Please contact me via:</p>
          <div className="relative flex flex-col gap-2">
            <ContactDetail />
          </div>
        </div>
      </div>
      <p className="text-xl font-light my-8">
        I would be pleased for any new opportunities, Thank you in advance.
      </p>
    </Section>
  )
}
export default Contact
