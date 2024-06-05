import { Container, Text, VStack, Input, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../integrations/supabase/index.js";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to Your New React App</Text>
        <Text>Start building something amazing!</Text>
        {!session ? (
          <>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} isLoading={loading}>
              Login
            </Button>
            {error && <Text color="red.500">{error}</Text>}
          </>
        ) : (
          <>
            <Text fontSize="xl">Authenticated Content</Text>
            <Text>This content is only visible to authenticated users.</Text>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;