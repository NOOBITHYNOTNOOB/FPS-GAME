import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Set up the display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("FPS Shooter Game")

# Load assets
target_image = pygame.Surface((50, 50))
target_image.fill(RED)

# Target class
class Target(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = target_image
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(0, SCREEN_WIDTH - self.rect.width)
        self.rect.y = random.randint(0, SCREEN_HEIGHT - self.rect.height)
        self.speed_x = random.choice([-3, 3])
        self.speed_y = random.choice([-3, 3])

    def update(self):
        self.rect.x += self.speed_x
        self.rect.y += self.speed_y

        if self.rect.left < 0 or self.rect.right > SCREEN_WIDTH:
            self.speed_x = -self.speed_x
        if self.rect.top < 0 or self.rect.bottom > SCREEN_HEIGHT:
            self.speed_y = -self.speed_y

# Player class
class Player:
    def __init__(self):
        self.score = 0

    def shoot(self, targets, pos):
        for target in targets:
            if target.rect.collidepoint(pos):
                target.kill()
                self.score += 1
                break

# Main game loop
def main():
    clock = pygame.time.Clock()
    player = Player()
    targets = pygame.sprite.Group()

    for _ in range(5):
        targets.add(Target())

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                player.shoot(targets, event.pos)

        targets.update()

        screen.fill(WHITE)
        targets.draw(screen)
        score_text = pygame.font.SysFont(None, 36).render(f"Score: {player.score}", True, BLACK)
        screen.blit(score_text, (10, 10))
        pygame.display.flip()

        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()